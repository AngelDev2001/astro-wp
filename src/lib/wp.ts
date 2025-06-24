const domain = import.meta.env.WP_DOMAIN;
const apiUrl = `${domain}/wp-json/wp/v2`;

export const getPageInfo = async (slug: string) => {
  const response = await fetch(`${apiUrl}/pages?slug=${slug}`);

  if (!response.ok) throw new Error("Failed to fetch page info");

  const [data] = await response.json();
  const {
    title: { rendered: title },
    content: { rendered: content },
  } = data;

  return { title, content };
};

export const getLatestPost = async ({
  perPage = 10,
}: { perPage?: number } = {}) => {
  const response = await fetch(`${apiUrl}/posts?per_page=${perPage}`);

  if (!response.ok) throw new Error("Failed to fetch page info");

  const results = await response.json();

  if (results.length === 0) throw new Error("No posts found");

  console.log(results);

  const posts = results.map((post) => {
    const {
      title: { rendered: title },
      excerpt: { rendered: excerpt },
      content: { rendered: content },
      date,
      slug,
    } = post;

    return { title, excerpt, content, date, slug };
  });

  return posts;
};
