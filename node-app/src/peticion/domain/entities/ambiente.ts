import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

import { CuerpoPeticion } from "./cuerpo";

@Entity("request_environment")
export class AmbientePeticion extends BaseEntity {
  @PrimaryGeneratedColumn()
  environment_id: number;

  @Column( { nullable: false })
  environment_name: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", nullable: false })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updateAt: Date;

  @OneToMany(() => CuerpoPeticion, cuerpo => cuerpo.ambiente)
    cuerpo: CuerpoPeticion;
}