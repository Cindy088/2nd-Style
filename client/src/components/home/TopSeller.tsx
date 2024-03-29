import { useList } from '@pankod/refine-core';
import { Box, Button, Stack, Typography } from '@pankod/refine-mui';
import { Link } from '@pankod/refine-react-router-v6';

interface SellerProfileProp {
    name: string,
    avatar: string
}

const SellerProfile = ({ name, avatar }: SellerProfileProp) => (
  <Stack direction="row" alignItems="center" gap="10px">
    <img src={avatar} alt="seller" width={50} height={50} style={{ borderRadius: 15, objectFit: 'cover' }} />
    <Box>
      <Typography fontSize={16} fontWeight={600} color="#11142D">{name}</Typography>
      <Typography mt="2px" fontSize={14} fontWeight={500} color="#808191">Top Seller</Typography>
    </Box>
  </Stack>
);

const TopSeller = () => {
  const { data, isLoading, isError } = useList({
    resource: 'users',
    config: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const topSellers = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Box
      p={4}
      id="chart"
      minWidth={490}
      bgcolor="#FCFCFC"
      display="flex"
      borderRadius="15px"
      flexDirection="column"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={18} fontWeight={600} color="#11142D">Top Sellers</Typography>
        <Button
          component={Link}
          to="/seller"
          variant="outlined"
          sx={{
            textTransform: 'capitalize',
            borderColor: '#E4E4E4',
            color: '#808191',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          View All
        </Button>
      </Stack>

      <Box mt="25px" display="flex" flexDirection="column" gap={4}>
        {topSellers.map((seller) => (
          <SellerProfile
            key={seller._id}
            name={seller.name}
            avatar={seller.avatar}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TopSeller;
