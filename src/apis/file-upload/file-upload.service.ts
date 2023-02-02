import { CanAwsService } from '@can/aws';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileUploadDto } from './file-upload.dto';

@Injectable()
export class FileUploadService {
  // Set S3 Bucket Name
  private BUCKET_NAME;

  constructor(
    private awsService: CanAwsService,
    private configService: ConfigService,
  ) {
    this.BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
  }

  public async uploadFileToS3(files: any): Promise<any> {
    return new Promise(async resolve => {
      // Store Upload Response
      const uploadedResponse: any = [];
      // Uplod Count
      let count = 0;
      // Uploading Files
      files.forEach(async (file: any) => {
        // Set Upload Params
        const uploadParams: any = {
          Bucket: this.BUCKET_NAME,
          Key: Date.now() + '_' + file['originalname'],
          Body: file['buffer'],
          ACL: 'public-read',
          ContentType: file['mimetype'],
        };

        if (file['mimetype'] === 'application/pdf') {
          uploadParams['ContentType'] = 'application/pdf';
          uploadParams['ContentDisposition'] = 'inline';
        }
        console.log("File upload >>>>>",uploadParams);
        
        // Uploading to S3
        const resp = await this.awsService.uploadToS3(uploadParams);
        // Store Response
        uploadedResponse.push({ name: resp.Key, path: resp.Location });
        // Increment Upload Count
        count++;
        // Resolve Promise
        if (count === files.length) {
          resolve({ files: uploadedResponse });
        }
      });
    });
  }

  public async deleteFromS3(fileUploadDto: FileUploadDto): Promise<any> {
    return new Promise(resolve => {
      // Store Delete Response
      const deletedResponse: any = [];
      // delete Count
      let count = 0;
      fileUploadDto.paths.forEach(async path => {
        const splittedPath = path.split('/');
        const key = splittedPath[splittedPath.length - 1].replace(
          new RegExp(/%20/gim),
          ' ',
        );
        await this.awsService.deleteFromS3({
          Bucket: this.BUCKET_NAME,
          Key: key,
        });
        // Store Response
        deletedResponse.push(key);
        // Increment Upload Count
        count++;
        // Resolve Promise
        if (count === fileUploadDto.paths.length) {
          resolve({ files: deletedResponse });
        }
      });
    });
  }
}
