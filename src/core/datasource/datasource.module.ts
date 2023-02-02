import { Module } from '@nestjs/common';
import { CAN_DATASOURCE_PROVIDERS } from './datasource.providers';
import { CanDataSourceConfig } from './datasource.config';

@Module({
    providers: [
        ...CAN_DATASOURCE_PROVIDERS, 
        CanDataSourceConfig
    ],
    exports: [
        ...CAN_DATASOURCE_PROVIDERS
    ],
})

export class CanDatasourceModule {}
