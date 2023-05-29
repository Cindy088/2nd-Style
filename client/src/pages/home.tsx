import { useList } from '@pankod/refine-core';
import { Typography, Box, Stack } from '@pankod/refine-mui';

import {
  PostCard,
  TopSeller,
} from 'components';

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: 'posts',
    config: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const latestPosts = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Box>
      <Typography ml="30px" fontSize={25} fontWeight={700} color="#11142D">Dashboard</Typography>
      <Stack mt="25px" width="100%" flexWrap="wrap" direction="row" gap={4}>
        <TopSeller />

        <Box
          flex={1}
          borderRadius="15px"
          padding="20px"
          bgcolor="#FCFCFC"
          display="flex"
          flexDirection="column"
          minWidth={{ xs: '100%', sm: 450 }}
        >
          <Typography fontSize={18} fontWeight={600} color="#11142D">Latest Posts</Typography>

          <Box mt={2.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {latestPosts.map((post) => (
              <PostCard
                key={post._id}
                id={post._id}
                title={post.title}
                location={post.location}
                price={post.price}
                photo={post.photo}
              />
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
