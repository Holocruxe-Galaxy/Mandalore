import { Injectable } from '@nestjs/common';
import { CreateLikesAndDislikeDto } from './dto/create-likes-and-dislike.dto';
import { UpdateLikesAndDislikeDto } from './dto/update-likes-and-dislike.dto';

@Injectable()
export class LikesAndDislikesService {
  create(createLikesAndDislikeDto: CreateLikesAndDislikeDto) {
    return 'This action adds a new likesAndDislike';
  }

  findAll() {
    return `This action returns all likesAndDislikes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likesAndDislike`;
  }

  update(id: number, updateLikesAndDislikeDto: UpdateLikesAndDislikeDto) {
    return `This action updates a #${id} likesAndDislike`;
  }

  remove(id: number) {
    return `This action removes a #${id} likesAndDislike`;
  }
}
