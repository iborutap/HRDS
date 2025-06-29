import { google } from 'googleapis';

export class GoogleSheetsService {
  constructor(spreadsheetId, credentials) {
    this.spreadsheetId = spreadsheetId;
    this.credentials = credentials;
    this.sheets = null;
  }

  // Initialize Google Sheets API
  async initialize() {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: this.credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });

      const authClient = await auth.getClient();
      this.sheets = google.sheets({ version: 'v4', auth: authClient });
      
      console.log('Google Sheets API initialized');
      console.log('Spreadsheet ID:', this.spreadsheetId);
    } catch (error) {
      console.error('Error initializing Google Sheets API:', error);
      throw error;
    }
  }

  // Read data from spreadsheet
  async readData(range = 'Sheet1!A1:H1000') {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: range,
      });
      
      return response.data;
    } catch (error) {
      console.error('Error reading from Google Sheets:', error.message);
      throw error;
    }
  }

  // Write data to spreadsheet
  async writeData(range, values) {
    try {
      const response = await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: values,
        },
      });
      
      return { 
        updatedRows: values.length,
        updatedRange: response.data.updatedRange
      };
    } catch (error) {
      console.error('Error writing to Google Sheets:', error.message);
      throw error;
    }
  }

  // Append data to spreadsheet
  async appendData(range, values) {
    try {
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: values,
        },
      });
      
      return { 
        updatedRows: values.length,
        updatedRange: response.data.updates.updatedRange
      };
    } catch (error) {
      console.error('Error appending to Google Sheets:', error.message);
      throw error;
    }
  }

  // Clear data from spreadsheet
  async clearData(range) {
    try {
      const response = await this.sheets.spreadsheets.values.clear({
        spreadsheetId: this.spreadsheetId,
        range: range,
      });
      
      return { 
        clearedRange: response.data.clearedRange
      };
    } catch (error) {
      console.error('Error clearing Google Sheets data:', error.message);
      throw error;
    }
  }
}

// Helper function to convert PersonData to Google Sheets row format
export const personToSheetRow = (person) => {
  return [
    person.fullName,
    person.populationId,
    person.familyId,
    person.gender,
    person.dateOfBirth,
    person.placeOfBirth,
    person.religion,
    person.bloodType
  ];
};

// Helper function to convert Google Sheets row to PersonData format
export const sheetRowToPerson = (row, id) => {
  return {
    id,
    fullName: row[0] || '',
    populationId: row[1] || '',
    familyId: row[2] || '',
    gender: row[3] || 'Male',
    dateOfBirth: row[4] || '',
    placeOfBirth: row[5] || '',
    religion: row[6] || '',
    bloodType: row[7] || 'A+'
  };
};