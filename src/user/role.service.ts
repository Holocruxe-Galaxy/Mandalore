import {
    Inject,
    Injectable,
    forwardRef,
    Scope,
  } from '@nestjs/common';
  import { REQUEST } from '@nestjs/core';
  import { ConfigService } from '@nestjs/config';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { User } from './schemas';
  import { CommonService } from 'src/common/common.service';
  import { NotificationsService } from 'src/settings/notifications/notifications.service';
  import { RequestWidhUser } from 'src/common/interfaces';

  @Injectable({ scope: Scope.REQUEST })
  export class RoleService {
      constructor (
        @Inject(forwardRef(() => ConfigService))
        private configService: ConfigService,
    
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    
        @Inject(forwardRef(() => CommonService))
        private commonService: CommonService,
    
        @Inject(forwardRef(() => NotificationsService))
        private notificationsService: NotificationsService,
    
        @Inject(REQUEST) private request: RequestWidhUser,
      ) {}

/* 
      OBSERVACIÓN: DENTRO DEL USER.SCHEMA NO ENCUENTRO LA PROPIEDAD DE ROLE
      ---------------------------------------------------------------------
      
      DEFINICIÓN DE LOS TYPOS DE ROLES (esto va dentro de la carpeta de types)
      export type UserRole = ['ADMIN', 'USER'];

      ////////////////////////////////////////////////////////////////////
      VALIDACIÓN DE ROLES
      private validRoles: Set<UserRole> = new Set(['ADMIN', 'USER'])

      FUNCIÓN PARA CREAR UN NUEVO ROL
      createNewRol(role: UserRole): UserRole {
          if(!this.valideRoles.has(role)) {
              this.validRoles.add(role)
          }
        return role
      }
*/      

/*    ////////////////////////////////////////////////////////////////////
      FUNCIÓN PARA ACTUALIZAR EL ESTADO DEL USUARIO

      async updateStatus(userIds: string[], newStatus: StatusType): Promise<User[]> {
        try {
            const updatedUser: User[] = []

            for (const userId of userIds) {
                const user = await this.userModel.findById(userId)

                if (user) {
                  user.status = newStatus
                  const updateUser = await user.save();
                  updatedUser.push(updateUser)
                }
            }
            return updatedUser;
        } catch (error) {
            console.log(error)
        }
      } */
  }