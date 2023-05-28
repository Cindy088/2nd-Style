import { useList } from '@pankod/refine-core';
import { Box, Typography } from '@pankod/refine-mui';

import { SellerCard } from 'components';

const Sellers = () => {
  const { data, isLoading, isError } = useList({
    resource: 'users',
  });

  const allSellers = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">Sellers List</Typography>

      <Box
        mt="20px"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          backgroundColor: '#FCFCFC' }}
      >
        {allSellers.length > 0
        && allSellers?.map((seller) => (
          <SellerCard
            key={seller._id}
            id={seller._id}
            name={seller.name}
            email={seller.email}
            avatar={seller.avatar}
            noOfPosts={seller.allPosts.length}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Sellers;
