import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Uproducts } from 'src/entities/Uproducts';

@Injectable()
export class CdsService {
  constructor(private readonly httpService: HttpService) {}

  mergeCdInfos(uproduct: Uproducts, cdInfo: any) {
    console.log(cdInfo);
    return {
      ...uproduct,
      categories: !uproduct.categories
        ? `MEDIAS>MUSIQUE;MUSIQUE>${(
            cdInfo.media[0].format as string
          ).toUpperCase()}`
        : uproduct.categories,
      vname: cdInfo.title,
      cover: cdInfo.cover,
      meta: cdInfo,
    };
  }

  async findOne(code: string): Promise<any | null> {
    try {
      const result = await this.httpService.axiosRef.get(
        `https://musicbrainz.org/ws/2/release`,
        {
          params: { query: `barcode:${code}` },
          headers: {
            Accept: 'application/json',
          },
        },
      );
      console.log(result.data);
      if (!result.data.releases[0]) return null;
      const cover = await this.httpService.axiosRef.get(
        `https://coverartarchive.org/release/${result.data.releases[0].id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return {
        ...result.data.releases[0],
        cover: cover.data.images
          .find((image: any) => image.front)
          .thumbnails.small.replace('http://', 'https://'),
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
