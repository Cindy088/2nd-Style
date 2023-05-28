import { useOne } from '@pankod/refine-core';
import { useParams } from '@pankod/refine-react-router-v6';

import { Profile } from 'components';

const SellerProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string,
  });

  const sellerProfile = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Profile
      type="Seller"
      name={sellerProfile?.name}
      avatar={sellerProfile?.avatar}
      email={sellerProfile?.email}
      posts={sellerProfile?.allPosts}
    />
  );
};

export default SellerProfile;
