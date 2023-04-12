import DBException from '../exceptions/DBException';
import { getModule } from '../models/index';

class NotificationDao {
  async insertNotification(dataParams) {
    try {
      const notification = getModule('notification');
      return notification.create(
        dataParams,
      );
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async getAllNotification() {
    try {
      const notification = getModule('notification');
      return notification.findAll({ raw: true, subQuery: false });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }

  async getNotification(notificationId) {
    try {
      const notification = getModule('notification');
      return notification.findAll({
        where: { notificationId },
        raw: true,
      });
    } catch (error) {
      throw new DBException(error.toString());
    }
  }
}

export default new NotificationDao();
