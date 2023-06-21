import { PartialType } from '@nestjs/mapped-types';
import { CreateLikesAndDislikeDto } from './create-likes-and-dislike.dto';

export class UpdateLikesAndDislikeDto extends PartialType(CreateLikesAndDislikeDto) {}
