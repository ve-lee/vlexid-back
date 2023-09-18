import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Uproducts } from 'src/entities/Uproducts';

@Injectable()
export class BooksService {
  constructor(private readonly httpService: HttpService) {}

  mergeBookInfos(uproduct: Uproducts, bookInfo: any) {
    return {
      ...uproduct,
      categories: !uproduct.categories ? 'MEDIAS>LIVRES' : uproduct.categories,
      vname: bookInfo.title,
      cover: `https://covers.openlibrary.org/b/isbn/${uproduct.code}-M.jpg`,
      meta: bookInfo,
    };
  }

  async findOne(code: string): Promise<any | null> {
    try {
      const result = await this.httpService.axiosRef.get(
        `https://openlibrary.org/isbn/${code}.json`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      if (!result.data) return null;
      const author = await this.httpService.axiosRef.get(
        `https://openlibrary.org/${result.data.authors[0].key}.json`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return {
        ...result.data,
        author: author?.data,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
