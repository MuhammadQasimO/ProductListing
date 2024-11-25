import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useGetProductsQuery, useGetCategoriesQuery} from '@store/productApi';
import {COMMON_TEXT, ITEMS_PER_PAGE} from '@constants';
import {styles} from './styles';
import type {Product} from '@typings/product';

const ProductList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: products,
    error,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page,
    category: selectedCategory,
  });

  const {data: categories} = useGetCategoriesQuery();

  useEffect(() => {
    if (products) {
      const newProducts = products.filter(
        product => !allProducts.some(p => p.id === product.id),
      );

      setAllProducts(prev => [...prev, ...newProducts]);

      if (newProducts.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [products]);

  const handleLoadMore = () => {
    if (hasMore && !isFetching) {
      setPage(prev => prev + 1);
    }
  };

  const handleCategoryChange = (itemValue: string | undefined) => {
    setSelectedCategory(itemValue);
    setPage(1);
    setAllProducts([]);
    setHasMore(true);
  };

  if (isLoading && !allProducts.length) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{COMMON_TEXT.errorProductList}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{COMMON_TEXT.filterByCategory}</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={handleCategoryChange}>
          <Picker.Item label={COMMON_TEXT.all} value={'all'} />
          {categories?.map(category => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
      </View>

      <FlatList
        data={allProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image source={{uri: item.image}} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
        ListFooterComponent={
          isFetching ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : hasMore ? (
            <Button title={COMMON_TEXT.loadMore} onPress={handleLoadMore} />
          ) : (
            <Text style={styles.endMessage}>{COMMON_TEXT.reachedEndList}</Text>
          )
        }
      />
    </View>
  );
};

export default ProductList;
