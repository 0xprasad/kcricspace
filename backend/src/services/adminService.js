import { query } from '../config/db.js';

export const getAdminOverview = async () => {
  const [metrics] = await Promise.all([
    query(
      `SELECT
          (SELECT COUNT(*) FROM tournaments WHERE status IN ('open', 'live')) AS active_tournaments,
          (SELECT COUNT(*) FROM tournament_teams WHERE registration_status = 'pending') AS pending_registrations,
          (SELECT COUNT(*) FROM matches WHERE DATE(scheduled_at) = CURRENT_DATE()) AS todays_matches,
          (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status = 'captured' AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)) AS revenue_last_30_days`
    )
  ]);

  const recentActivity = await query(
    `SELECT 'payment' AS entity_type, provider_order_id AS reference_id, status, created_at
     FROM payments
     ORDER BY created_at DESC LIMIT 5`
  );

  return { metrics: metrics[0], recentActivity };
};
