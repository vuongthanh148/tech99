import { AppDataSource } from "../db";
import { ResourceEntity } from "../entities/resource.entity";
import { Resource, ResourceFilters } from "../types";

export async function createResource(data: Resource): Promise<ResourceEntity> {
  console.log(data);
  const newResource = AppDataSource.getRepository(ResourceEntity).create({
    name: data.name,
    description: data.description,
    type: data.type,
  });
  return await AppDataSource.getRepository(ResourceEntity).save(newResource);
}

export async function listResources(
  filters: ResourceFilters
): Promise<ResourceEntity[]> {
  const queryBuilder =
    AppDataSource.getRepository(ResourceEntity).createQueryBuilder("resource");

  if (filters.name) {
    queryBuilder.andWhere("resource.name LIKE :name", {
      name: `%${filters.name}%`,
    });
  }
  if (filters.type) {
    queryBuilder.andWhere("resource.type = :type", { type: filters.type });
  }

  return await queryBuilder.getMany();
}

export async function getResource(
  id: number
): Promise<ResourceEntity | undefined> {
  const resource = await AppDataSource.getRepository(ResourceEntity).findOne({
    where: { id },
  });
  return resource === null ? undefined : resource;
}

export async function updateResource(
  id: number,
  data: Partial<Resource>
): Promise<ResourceEntity | undefined> {
  await AppDataSource.getRepository(ResourceEntity).update(id, data);
  const resource = await AppDataSource.getRepository(ResourceEntity).findOne({
    where: { id },
  });
  return resource === null ? undefined : resource;
}

export async function deleteResource(id: number): Promise<void> {
  await AppDataSource.getRepository(ResourceEntity).delete(id);
}
