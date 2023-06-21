import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikesAndDislikesService } from './likes-and-dislikes.service';
import { CreateLikesAndDislikeDto } from './dto/create-likes-and-dislike.dto';
import { UpdateLikesAndDislikeDto } from './dto/update-likes-and-dislike.dto';

@Controller('likes-and-dislikes')
export class LikesAndDislikesController {
  constructor(private readonly likesAndDislikesService: LikesAndDislikesService) {}

  @Post()
  create(@Body() createLikesAndDislikeDto: CreateLikesAndDislikeDto) {
    return this.likesAndDislikesService.create(createLikesAndDislikeDto);
  }

  @Get()
  findAll() {
    return this.likesAndDislikesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesAndDislikesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikesAndDislikeDto: UpdateLikesAndDislikeDto) {
    return this.likesAndDislikesService.update(+id, updateLikesAndDislikeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesAndDislikesService.remove(+id);
  }
}
