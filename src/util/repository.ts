import { getRepository } from "typeorm";
import { Project } from "../entity/projects/Project";
import { User } from "../entity/user/User";

export const repositorys = {
    Project: getRepository(Project),
    User: getRepository(User),
}