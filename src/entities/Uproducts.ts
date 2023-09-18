import { Column, Entity, Index } from 'typeorm';

@Index('uproducts_pkey', ['code'], { unique: true })
@Entity('uproducts', { schema: 'public', synchronize: false })
export class Uproducts {
  @Column('bigint', { primary: true, name: 'code' })
  code: string;

  @Column('text', { name: 'brand', nullable: true })
  brand: string | null;

  @Column('character varying', { name: 'model', nullable: true, length: 255 })
  model: string | null;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('timestamp without time zone', {
    name: 'last_updated',
    nullable: true,
  })
  lastUpdated: Date | null;

  @Column('character varying', {
    name: 'gs1_country',
    nullable: true,
    length: 10,
  })
  gs1Country: string | null;

  @Column('character varying', { name: 'gtintype', nullable: true, length: 10 })
  gtintype: string | null;

  @Column('smallint', { name: 'offers_count', nullable: true })
  offersCount: number | null;

  @Column('money', { name: 'min_price', nullable: true })
  minPrice: string | null;

  @Column('money', { name: 'min_price_compensation', nullable: true })
  minPriceCompensation: string | null;

  @Column('character varying', { name: 'currency', nullable: true, length: 10 })
  currency: string | null;

  @Column('text', { name: 'categories', nullable: true })
  categories: string | null;

  @Column('text', { name: 'url', nullable: true })
  url: string | null;

  @Column('text', { name: 'vname', nullable: true })
  vname: string | null;

  @Column('text', { name: 'cover', nullable: true })
  cover: string | null;

  @Column('json', { name: 'meta', nullable: true })
  meta: object | null;
}
