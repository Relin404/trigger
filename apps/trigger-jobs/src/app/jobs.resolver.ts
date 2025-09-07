import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '@trigger/nestjs';
import { JobMetadata } from './interfaces/job-metadata.interface';
import { ExecuteJobInput } from './dto/execute-job.input';
import { JobsService } from './jobs.service';
import { Job } from './models/job.model';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobService: JobsService) {}

  @Query(() => [Job], { name: 'jobs' })
  @UseGuards(GqlAuthGuard)
  async getJobs(): Promise<JobMetadata[]> {
    return this.jobService.getJobs();
  }

  @Mutation(() => Job)
  @UseGuards(GqlAuthGuard)
  async executeJob(@Args('executeJobInput') executeJobInput: ExecuteJobInput) {
    return this.jobService.executeJob(executeJobInput.name);
  }
}
