import { Module } from '@nestjs/common';
import {AllocationController} from "@controller/allocation.controller";
import {AllocationService} from "@service/allocation.service";

@Module({
    controllers: [AllocationController],
    providers: [AllocationService],
    imports: [],
})
export class AllocationModule {}
