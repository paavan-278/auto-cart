import {
  Controller,
  Post,
  Body,
  Req,
  UploadedFiles,
  UseInterceptors,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

import { CreateAdDto } from './dto/ad.dto';
import { AdService } from './ad.service';
import { TokenDependency } from 'src/user/dependencies/token.dependency';

@ApiTags('place ad')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('ads')
export class AddController {
  constructor(
    private readonly adService: AdService,
    private readonly tokenDependency: TokenDependency,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'uploadPhoto', maxCount: 20 },
        { name: 'uploadStory', maxCount: 5 },
      ],
      {
        limits: {
          fileSize: 30 * 1024 * 1024,
          files: 25,
        },
      },
    ),
  )
  async create(
    @UploadedFiles()
    files: {
      uploadPhoto?: Express.Multer.File[];
      uploadStory?: Express.Multer.File[];
    },
    @Body() body: CreateAdDto,
    @Req() req: Request,
  ) {
    const userId = this.tokenDependency.getUserId(req);

    return await this.adService.createAd(body, files, userId);
  }

  @Get()
  async getAll(@Req() req: Request) {
    const userId = this.tokenDependency.getUserId(req);

    return await this.adService.getAll(userId);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Req() req: Request) {
    const userId = this.tokenDependency.getUserId(req);

    return await this.adService.getAdById(id, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    const userId = this.tokenDependency.getUserId(req);

    return await this.adService.deleteAd(id, userId);
  }
}
