import { Server } from '@hapi/hapi';
import * as weekController from './weekController';
import { createShiftDto, filterSchema, idDto, updateShiftDto } from '../../../shared/dtos';

export default function (server: Server, basePath: string) {

  server.route({
    method: "GET",
    path: basePath,
    handler: weekController.find,
    options: {
      description: 'Get weeks with filter',
      notes: 'Get all weeks if filter is not specified.',
      tags: ['api', 'weeks']
    }
  });

  server.route({
    method: "GET",
    path: basePath + "/{id}",
    handler: weekController.findById,
    options: {
      description: 'Get week detail by id',
      notes: 'Get week by id',
      tags: ['api', 'week']
    }
  });

  server.route({
    method: "PUT",
    path: basePath + "/{id}/publish",
    handler: weekController.publish,
    options: {
      description: 'Publish Week by week id',
      notes: 'Publish Week by week id',
      tags: ['api', 'week']
    }
  });
}