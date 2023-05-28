import { Email, Phone, Place } from '@mui/icons-material';
import { Box, Stack, Typography } from '@pankod/refine-mui';

import { ProfileProps, PostProps } from 'interfaces/common';
import PostCard from './PostCard';

const Profile = ({ type, name, avatar, email, posts }: ProfileProps) => (
  <Box>
    <Typography fontSize={25} fontWeight={700} color="#11142D">{type} Profile</Typography>

    <Box
      mt="20px"
      borderRadius="15px"
      padding="20px"
      bgcolor="#FCFCFC"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2.5,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
          width={340}
          height={320}
          alt="abstract"
          className="my_profile-bg"
        />

        <Box
          flex={1}
          sx={{ marginTop: { md: '58px' }, marginLeft: { xs: '20px', md: '0px' } }}
        >
          <Box flex={1} display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap="20px">
            <img
              src={avatar}
              width={78}
              height={78}
              alt="user_profile"
              className="my_profile_user-img"
            />

            <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between" gap="30px">
              <Stack direction="column">
                <Typography fontSize={22} fontWeight={600} color="#11142D">{name}</Typography>
                <Typography fontSize={16} color="#808191">Seller</Typography>
              </Stack>

              <Stack direction="column" gap="30px">
                <Stack gap="15px">
                  <Typography fontSize={14} fontWeight={500} color="#808191">Address</Typography>
                  <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
                    <Place sx={{ color: '#11142D' }} />
                    <Typography fontSize={14} color="#11142D">123 User Avenue, Sydney, NSW 2000, Australia</Typography>
                  </Box>
                </Stack>

                <Stack direction="row" flexWrap="wrap" gap="20px" pb={4}>
                  <Stack flex={1} gap="15px">
                    <Typography fontSize={14} fontWeight={500} color="#808191">Phone Number</Typography>
                    <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
                      <Phone sx={{ color: '#11142D' }} />
                      <Typography fontSize={14} color="#11142D" noWrap>+0123 456 7890</Typography>
                    </Box>
                  </Stack>

                  <Stack flex={1} gap="15px">
                    <Typography fontSize={14} fontWeight={500} color="#808191">Email</Typography>
                    <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
                      <Email sx={{ color: '#11142D' }} />
                      <Typography fontSize={14} color="#11142D">{email}</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>

    {posts.length > 0 && (
    <Box
      mt={2.5}
      borderRadius="15px"
      padding="20px"
      bgcolor="#FCFCFC"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142D">{type} Posts</Typography>

      <Box
        mt={2.5}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2.5,
        }}
      >
        {posts?.map((post: PostProps) => (
          <PostCard key={post._id} id={post._id}
            title={post.title}
            location={post.location}
            price={post.price}
            photo={post.photo}
          />
        ))}
      </Box>
    </Box>
    )}
  </Box>
);

export default Profile;
