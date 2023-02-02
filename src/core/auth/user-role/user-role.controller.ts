import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UserRoleDto } from './user-role.dto';
import { UserRoleService } from './user-role.service';
import { FindOptions, CountOptions } from 'sequelize';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';

@Controller('user-role')
export class UserRoleController {
  constructor(private userRolesService: UserRoleService) {}

  @Get('mapped-roles')
  async findUserRoles(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.userRolesService.findUserRoles(filter);
  }

  @Post('map-roles')
  async mapUserRole(@Body(ValidationPipe) userRolesDto: any) {
    return this.userRolesService.mapUserRole(userRolesDto);
  }

  @Get('maps')
  async findOne(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.userRolesService.findOne(filter);
  }
  
  @Post()
  async create(@Body(ValidationPipe) userRolesDto: UserRoleDto) {
    return this.userRolesService.create(userRolesDto);
  }




  @Patch('map-roles/:id')
  async updateMappedUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    userRolesDto: UserRoleDto,
  ) {
    return this.userRolesService.updateMappedUserRole(id, userRolesDto);
  }


  
  @Get()
  async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.userRolesService.findAll(filter);
  }

  @Get('count')
  async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
    return this.userRolesService.count(filter);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.userRolesService.findById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    userRolesDto: UserRoleDto,
  ) {
    return this.userRolesService.updateById(id, userRolesDto);
  }
}
