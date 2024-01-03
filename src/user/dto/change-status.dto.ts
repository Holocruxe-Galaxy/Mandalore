import { IsString, IsOptional, IsArray, IsIn } from 'class-validator';
import { status, StatusType } from '../types';

export class ChangeStatusDto {
    @IsIn(status)
    statusType: StatusType

    @IsArray()
    @IsString({ each: true })
    users: string[]

    @IsString()
    @IsOptional()
    timeLapse?: string
}