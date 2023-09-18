import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Uproducts } from 'src/entities/Uproducts';
import { Repository } from 'typeorm';
import { DvdsService } from 'src/dvds/dvds.service';
import { BooksService } from 'src/books/books.service';
import { CdsService } from 'src/cds/cds.service';

@Injectable()
export class ProductsService {
  private readonly logger: Logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Uproducts)
    private uproductsRepository: Repository<Uproducts>,
    private readonly dvdsService: DvdsService,
    private readonly booksService: BooksService,
    private readonly cdsService: CdsService,
  ) {}

  create(_createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll(): Promise<Uproducts[]> {
    return this.uproductsRepository.find();
  }
  private async fetchUpdate(uproduct: Uproducts) {
    if (!uproduct?.vname) {
      const { code } = uproduct;
      try {
        const dvd = await this.dvdsService.findOne(code);
        if (dvd) {
          const mergeProduct = this.dvdsService.mergeDvdInfos(uproduct, dvd);
          return mergeProduct;
        }
        const book = await this.booksService.findOne(code);
        if (book) {
          const mergeProduct = this.booksService.mergeBookInfos(uproduct, book);
          return mergeProduct;
        }
        const cd = await this.cdsService.findOne(code);
        if (cd) {
          const mergeProduct = this.cdsService.mergeCdInfos(uproduct, cd);
          return mergeProduct;
        }
      } catch (error) {
        this.logger.error({ error }, `Error updating ${code}`);
        return uproduct;
      }
    }
    return uproduct;
  }

  private async findProduct(code: string) {
    try {
      const uproduct = await this.uproductsRepository.findOneBy({ code });
      this.logger.log({ uproduct }, 'UProducts');
      if (uproduct) return uproduct;
    } catch (error) {
      this.logger.log({ error, code }, 'Error Fetching');
    }
    const uproduct = new Uproducts();
    uproduct.code = code;
    return uproduct;
  }

  async findOne(code: string): Promise<Uproducts | null> {
    const start = Date.now();
    this.logger.log({ start, code }, 'Looking for barcode');
    const uproduct = await this.findProduct(code);
    const update = await this.fetchUpdate(uproduct);
    const updated = await this.uproductsRepository.save(update);
    const elapsed = Date.now() - start;
    this.logger.log({ start, elapsed, updated }, 'UProduct DVD updated');
    return updated;
  }

  update(code: number, _updateProductDto: UpdateProductDto) {
    return `This action updates a #${code} product`;
  }

  async remove(code: number): Promise<void> {
    await this.uproductsRepository.delete(code);
  }
}
