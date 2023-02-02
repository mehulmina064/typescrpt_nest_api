import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CanPermissionsConfig } from './permissions.type';
import { CanPermissionsService } from './permissions.service';
import { CanContextService } from '../services/context/context.service';

@Injectable()
export class CanPermissionsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      // Permissions Service
      const permissionService = CanContextService.getAppContext().get(
        CanPermissionsService,
      );
      /**
       * Extract Permissions
       */
      const permissions: CanPermissionsConfig = permissionService.extractPermissions(
        context,
      );
      /**
       * Validation Permissions If and / or permissions
       */
      if (
        permissions &&
        ((permissions.and && permissions.and.length) ||
          (permissions.or && permissions.or.length))
      ) {
        const currentUser = permissionService.extractRolesAndPermissions(
          context,
        );
        const isValid = permissionService.validatePermission(
          currentUser,
          permissions,
        );
        if (!isValid) {
          return false;
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
