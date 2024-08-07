

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { CuerpoPeticion } from "./cuerpo";

@Entity("request_type")
export class TipoPeticion extends BaseEntity {
  @PrimaryGeneratedColumn()
  type_id: number;

  @Column( { nullable: true })
  type_name: string;

  @Column( { nullable: false })
  url: string;
  
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updateAt: Date;

  @OneToMany(() => CuerpoPeticion, cuerpo => cuerpo.tipo)
    cuerpo: CuerpoPeticion;
}
