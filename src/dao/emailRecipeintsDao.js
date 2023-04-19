import { getModule } from '../models/index';

class emailRecipeintsDao {
  async insertResEntry(dataParams) {
    const Res = getModule('emailRecipeints');
    return Res.upsert({
      Res_name: dataParams.name,
      To_list: dataParams.to,
      Cc_list: dataParams.cc,
      Bc_list: dataParams.bc,
      Active: dataParams.active,
    });
  }
}

export default new emailRecipeintsDao();
