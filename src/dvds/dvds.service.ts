import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Uproducts } from 'src/entities/Uproducts';
import * as txml from 'txml';

@Injectable()
export class DvdsService {
  constructor(private readonly httpService: HttpService) {}

  private parseDvdInfo(xml: string) {
    const jsResult = txml.parse(xml, { simplify: true });
    if (jsResult.errors) return undefined;
    console.log(jsResult.dvds);
    return jsResult.dvds.dvd;
  }

  mergeDvdInfos(uproduct: Uproducts, dvdInfo: any) {
    return {
      ...uproduct,
      categories: !uproduct.categories
        ? `MEDIAS>DVD ET VIDEOS ; ${dvdInfo.media}`
        : uproduct.categories,
      vname: dvdInfo.titres.fr,
      cover: dvdInfo.cover,
      meta: dvdInfo,
    };
  }

  async findOne(code: string): Promise<any | null> {
    try {
      const uproduct = await this.httpService.axiosRef.get(
        'https://www.dvdfr.com/api/search.php',
        { params: { gencode: code } },
      );
      if (!uproduct.data) return null;
      const dvdInfos = this.parseDvdInfo(uproduct.data);
      return dvdInfos;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
