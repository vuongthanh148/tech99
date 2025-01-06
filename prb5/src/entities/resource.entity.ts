import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ResourceEntity {
  constructor(id: number, name: string, description: string, type: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  type!: string;

  @Column({ type: "text", nullable: true })
  description?: string;
}
