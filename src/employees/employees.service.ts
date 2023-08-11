/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private readonly employeeRepository: Repository<Employee>,
    ) { }

    findAll() {
        return this.employeeRepository.find();
    }

    async findOneById(id: number) {
        const findOneOptions: FindOneOptions<Employee> = { where: { id } };
        return this.employeeRepository.findOne(findOneOptions);
    }

    async update(id: number, employee: Employee): Promise<Employee> {
        await this.employeeRepository.update(id, employee);
        return this.employeeRepository.findOne(id);
    }

    remove(id: number) {
        return this.employeeRepository.delete(id);
    }
}
