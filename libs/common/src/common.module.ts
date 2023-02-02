import { HttpModule, Module } from '@nestjs/common';
import { CanCommonService } from './common.service';
import { CanTextParserService } from './helpers/parser/text-parser.service';
import { CanPermissionModule } from './permissions/permissions.module';
import { EdelweissInsuranceAuthService } from './services/edelweiss-insurance/edelweiss-insurance.service';
import { CanFileService } from './services/files/file.service';
import { CanCsvParserService } from './services/parser/csv-parser.service';

@Module({
  providers: [
    CanCommonService,
    CanTextParserService,
    CanCsvParserService,
    CanFileService,
    EdelweissInsuranceAuthService
  ],
  exports: [
    CanCommonService,
    CanPermissionModule,
    CanTextParserService,
    CanCsvParserService,
    CanFileService,
    EdelweissInsuranceAuthService
  ],
  imports: [CanPermissionModule, HttpModule],
})
export class CanCommonModule {}
