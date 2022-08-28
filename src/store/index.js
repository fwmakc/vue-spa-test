import { createStore } from 'vuex';
import { entriesModule } from '@/store/entriesModule';
import { usersModule } from '@/store/usersModule';
import { routesModule } from '@/store/routesModule';

export default createStore({
  modules: {
    entries: entriesModule,
    users: usersModule,
    routes: routesModule,
  }
});