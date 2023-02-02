import { Injectable } from '@nestjs/common';
import fs = require('fs');
import path = require('path');
import multer = require('multer');

@Injectable()
export class CanFileService {
  public getLocalStoredFilePath(file: any) {
    return path.join(file.destination, file.originalname);
  }

  private async removeTempFile(filePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, err => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  public async removeTempFiles(files: any[]): Promise<boolean> {
    // Remove Temp File
    let result = false;
    for (let file of files) {
      result = await this.removeTempFile(this.getLocalStoredFilePath(file));
    }
    return result;
  }

  public static getFilesStorage() {
    // Set File Storage Path
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, './');
      },
      filename: function(req, file, cb) {
        cb(null, file.originalname);
      },
    });
    return storage;
  }
}
