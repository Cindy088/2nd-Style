import { useMemo } from 'react';
import { Add } from '@mui/icons-material';
import { useTable } from '@pankod/refine-core';
import { Box, MenuItem, Select, Stack, TextField, Typography } from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';

import { PostCard, CustomButton } from 'components';

const AllPosts = () => {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter, setSorter,
    filters, setFilters,
  } = useTable();

  const allPosts = data?.data ?? [];

  const currentPrice = sorter.find((item) => item.field === 'price')?.order || 'desc';

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc' }]);
  };

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) => ('field' in item ? item : []));

    return {
      title: logicalFilters.find((item) => item.field === 'title')?.value || '',
      postType: logicalFilters.find((item) => item.field === 'postType')?.value || '',
    };
  }, [filters]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} ml="30px" color="#11142D">
            {!allPosts.length ? 'There are no posts' : 'All Posts'}
          </Typography>
          <Box mb={2} mt={3} display="flex" width="84%" justifyContent="space-between" flexWrap="wrap">
            <Box display="flex" gap={2} flexWrap="wrap" mb={{ xs: '20px', sm: 0 }}>
              <CustomButton
                title={`Sort price ${currentPrice === 'asc' ? '↑' : '↓'}`}
                handleClick={() => toggleSort('price')}
                backgroundColor="#e31953"
                color="#FCFCFC"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: 'title',
                      operator: 'contains',
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue=""
                value={currentFilterValues.postType}
                onChange={(e) => setFilters(
                  [
                    {
                      field: 'postType',
                      operator: 'eq',
                      value: e.target.value,
                    },
                  ],
                  'replace',
                )}
              >
                <MenuItem value="">All</MenuItem>
                {['Top', 'Dresses', 'Jumpers', 'Hoodies', 'Jackets', 'Skirts', 'Pants', 'Shoes', 'Accessories'].map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>{type}</MenuItem>
                ))}
              </Select>
            </Box>
            <CustomButton
              title="Add Post"
              handleClick={() => navigate('/posts/create')}
              backgroundColor="#e31953"
              color="#FCFCFC"
              icon={<Add />}
            />
          </Box>
        </Stack>
        {allPosts?.map((post) => (
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
      {allPosts.length ? (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#e31953"
            color="#FCFCFC"
            disabled={!(current > 1)}
          />
          <Box display={{ xs: 'hidden', sm: 'flex' }} alignItems="center" gap="5px">
            Page{' '}<strong> {current} of {pageCount} </strong>
          </Box>
          <CustomButton
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#e31953"
            color="#FCFCFC"
            disabled={current === pageCount}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue={10}
            onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem key={size} value={size}>Show {size}</MenuItem>
            ))}
          </Select>
        </Box>
      ) : null}
    </Box>
  );
};

export default AllPosts;
