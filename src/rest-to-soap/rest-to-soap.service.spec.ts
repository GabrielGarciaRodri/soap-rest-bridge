import { Test, TestingModule } from '@nestjs/testing';
import { RestToSoapService } from './rest-to-soap.service';

describe('RestToSoapService', () => {
  let service: RestToSoapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestToSoapService],
    }).compile();

    service = module.get<RestToSoapService>(RestToSoapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
