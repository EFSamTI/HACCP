import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { TipoPeticion } from "./tipo-peticion";
import { AmbientePeticion } from "./ambiente";


@Entity("request_body")
export class CuerpoPeticion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  environment_id: number;

  @Column({ nullable: true })
  request_type_id: number;

  @Column({ nullable: false })
  source: string;


  @Column({ nullable: false })
  destination: string;

  @Column({ nullable: false })
  operation: string;

  @Column({ nullable: false })
  verb: string;

  @Column({ nullable: false })
  path: string;

  @Column({ nullable: true })
  state: boolean;

  
  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updateAt: Date;

  @ManyToOne(() => AmbientePeticion, ambiente => ambiente.cuerpo)  
  @JoinColumn({ name: "environment_id" })
  ambiente: AmbientePeticion;

  @ManyToOne(() => TipoPeticion, tipo => tipo.cuerpo)
  @JoinColumn({ name: "request_type_id" })
  tipo: TipoPeticion;



}

