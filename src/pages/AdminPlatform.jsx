import { useEffect, useState } from 'react';
import { fetchAdminStats } from '../api/admin';

function StatCard({ label, value }) {
  return (
    <div className="rounded-lg border p-4 text-center">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function ComingSoonCard({ label }) {
  return (
    <div className="rounded-lg border border-dashed p-4 text-center text-gray-400">
      <div className="text-3xl font-semibold">—</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}

export function AdminPlatform() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAdminStats().then(setStats).catch((err) => console.error(err));
  }, []);

  if (!stats) return <div className="p-8">Loading...</div>;

  const fans = stats.users - stats.artists;

  return (
    <div className="p-8 flex flex-col gap-8">
      <section>
        <h2 className="text-lg font-semibold mb-3">Users</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard label="Total users" value={stats.users} />
          <StatCard label="Artists" value={stats.artists} />
          <StatCard label="Fans" value={fans} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Publications</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Tracks" value={stats.tracks} />
          <StatCard label="Flagged tracks" value={stats.flaggedTracks} />
          <ComingSoonCard label="Podcasts (coming soon)" />
          <ComingSoonCard label="Albums / EPs (coming soon)" />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Blogs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard label="Blog posts" value={stats.blogPosts} />
          <StatCard label="Comments" value={stats.comments} />
        </div>
      </section>
    </div>
  );
}
