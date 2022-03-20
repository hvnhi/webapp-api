import { classToPlain, Transform } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { decodeId, encodeId, isEmpty, slugify } from '../utils/Helper';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Transform(({ value }) => encodeId(value), { toPlainOnly: true })
  id: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  public fill(data = {}, props: string[] = []): any {
    props.forEach((propName) => {
      if (data.hasOwnProperty(propName)) {
        this[propName] = data[propName];

        if (propName === 'parentId' && !isEmpty(decodeId(data[propName]))) {
          this[propName] = decodeId(data[propName]);
        } else if (propName === 'slug') {
          this[propName] = slugify(data[propName]);
        }
      }
    });

    return this;
  }

  public toJSON(): any {
    return classToPlain(this);
  }
}
