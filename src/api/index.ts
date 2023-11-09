import * as fastify from 'fastify'
import authRoutes from './auth/routes';
import categoryRoutes from './category/routes';
import countryRoutes from './country/routes';
import loginAvatarRoutes from './login-avatar/routes';
import postRoutes from './post/routes';
import postImageRoutes from './post-image/routes';
import postThumbnailRoutes from './post-thumbnail/routes';
import roleRoutes from './role/routes';
import stateRoutes from './state/routes';

export default (app: fastify.FastifyInstance) => {
  app.register(authRoutes, { prefix: "/auth" });
  app.register(categoryRoutes, { prefix: "/category" });
  app.register(countryRoutes, { prefix: "/country" });
  app.register(loginAvatarRoutes, { prefix: "/login-avatar" });
  app.register(postRoutes, { prefix: "/post" });
  app.register(postImageRoutes, { prefix: "/post-image" })
  app.register(postThumbnailRoutes, { prefix: "/post-thumbnail" });
  app.register(roleRoutes, { prefix: "/role" });
  app.register(stateRoutes, { prefix: "/state" });
}
