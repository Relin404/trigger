import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from '../decorators/job.decorator';
import { JobMetadata } from '../interfaces/job-metadata.interface';
import { ExecuteJobInput } from './dto/execute-job.input';
import { JobsService } from './jobs.service';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobService: JobsService) {}

  @Query(() => [Job], { name: 'jobs' })
  async getJobs(): Promise<JobMetadata[]> {
    return this.jobService.getJobs();
  }

  @Mutation(() => Job)
  async executeJob(@Args('executeJobInput') executeJobInput: ExecuteJobInput) {
    return this.jobService.executeJob(executeJobInput.name);
  }
}
