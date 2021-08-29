import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  constructor(private config: ConfigService) {}

  /////Authus Command API
  public get getCustomerToken(): string {
    return this.config.SERVER_API + 'integration/customer/token';
  }
  public get getAdminTokenToken(): string {
    return this.config.SERVER_API + 'integration/admin/token';
  }

  customerRegister = this.config.SERVER_API + 'customers';

  ///////// Products Information /////////////
  getProducts(
    searchCriteria = '',
    storeID = 1,
    currencyCode = 'USD',
    currentPage = 1,
    pageSize = 10
  ) {
    return (
      "http://localhost/arabianceramics/rest/default/V1/products-render-info?searchCriteria='" +
      searchCriteria +
      "'&currencyCode=" +
      currencyCode +
      '&storeId=' +
      storeID +
      '&currentPage=' +
      currentPage +
      '&pageSize=' +
      pageSize
    );
  }
  getSingleProductById(sku) {
    return (
      this.config.SERVER_API +'searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[filterGroups][0][filters][0][field]=sku&searchCriteria[filterGroups][0][filters][0][value]='+ sku
    );
  }

  ////////////Home Page/////////////////
  getHomeCategories() {
    return this.config.SERVER_API + 'mma/categories';
  }
  getSingleCategory(categoryId) {
    return this.config.SERVER_API + 'categories/'+categoryId+'/products';
  }
  getCategoriesForAdmin() {
    return this.config.SERVER_API + 'categories';
  }
  getTopProducts(limit) {
    return this.config.SERVER_API + 'mma/products/top-rated/' + limit;
  }
  getMostViewedProducts(limit) {
    return this.config.SERVER_API + 'mma/products/most-viewed/' + limit;
  }
  getBestProducts(limit) {
    return this.config.SERVER_API + 'mma/products/best-seller/' + limit;
  }
  getNewProducts(limit) {
    return this.config.SERVER_API + 'mma/products/new/' + limit;
  }

  /////////Products//////////////
  getProductById(id) {
    return (
      this.config.SERVER_API +
      'products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=' +
      id
    );
  }
  getSingleProduct(sku) {
    return this.config.SERVER_API + 'products/' + sku;
  }
  getSingleProductReview(sku) {
    return this.config.SERVER_API + 'mma/review/reviews/' + sku;
  }
  getAllProducts() {    
    return this.config.SERVER_API + 'products-render-info?currencyCode=USA&searchCriteria[currentPage]=0&storeId=1';
  }
  addProduct(productName) {
    return this.config.SERVER_API + 'products/'+productName;
  }

  /////Cart and Orders///////////
  guestCart() {
    return this.config.SERVER_API + 'V1/guest-carts';
  }
  setShippingInformation() {
    return this.config.SERVER_API + 'carts/mine/shipping-information';
  }
  setGuestShippingInformation(cartId) {
    return (
      this.config.SERVER_API + 'guest-carts/' + cartId + '/shipping-information'
    );
  }
  setPaymentMethod() {
    return this.config.SERVER_API + 'carts/mine/payment-information';
  }
  setGuestPaymentMethod(cartId) {
    return (
      this.config.SERVER_API + 'guest-carts/' + cartId + '/payment-information'
    );
  }

  ////////Oreders//////  V1/guest-carts

  getGuestCart() {
    return this.config.SERVER_API + 'guest-carts';
  }
  getGuestCustomer() {
    return this.config.SERVER_API + 'carts/mine';
  }
  addItemInCustomerCart() {
    return this.config.SERVER_API + 'carts/mine/items';
  }
  addItemInGuestCart(cartId) {
    return this.config.SERVER_API + 'guest-carts/' + cartId + '/items';
  }
  customerShippingMethod() {
    return this.config.SERVER_API + 'carts/mine/estimate-shipping-methods';
  }
  guestShippingMethod(cartId) {
    return (
      this.config.SERVER_API +
      'guest-carts/' +
      cartId +
      '/estimate-shipping-methods'
    );
  }

  //////Profile////////////\
  getSelfDetail() {
    return this.config.SERVER_API + 'customers/me';
  }
  getAddressAttributes() {
    return this.config.SERVER_API + 'attributeMetadata/customerAddress/';
  }
  getCountryList() {
    return this.config.SERVER_API + 'directory/countries';
  }
  getCountryDetail(id) {
    return this.config.SERVER_API + 'directory/countries/' + id;
  }
  getRegionGraphQL(id) {
    return (
      this.config.SERVER +
      `query { country(id: "` +
      id +
      `") 
        {
          id
          two_letter_abbreviation
          three_letter_abbreviation
          full_name_locale
          full_name_english
          available_regions {
              id
              code
              name
        }
      }
  }`
    );
  }
  updatePassword() {
    return this.config.SERVER_API + 'customers/me/password';
  }
  resetPassword() {
    return this.config.SERVER_API + 'customers/password';
  }
  getCustomerProfile() {
    return this.config.SERVER_API + 'customers/me';
  }
  getCustomerReviews(id) {
    return (
      this.config.SERVER_API +
      'orders?searchCriteria[filterGroups][0][filters][0][field]=customer_id&searchCriteria[filterGroups][0][filters][0][value]=' +
      4
    );
  }
  getSearch(searchValue) {
    return (
      this.config.SERVER_API +
      'products-render-info?searchCriteria[currentPage]=0&storeId=1&currencyCode=US'
    );
  }
  getFilterByPrice(minPrice, highPrice) {
    return (
      this.config.SERVER_API +
      'search?searchCriteria[requestName]=advanced_search_container&searchCriteria[filter_groups][0][filters][0][field]=price.from&searchCriteria[filter_groups][0][filters][0][value]=' +
      minPrice +
      '&searchCriteria[filter_groups][0][filters][1][field]=price.to&searchCriteria[filter_groups][0][filters][1][value]=' +
      highPrice +
      ''
    );
  }

  ///////////Customers///////////

  allCustomers(page, search, size) {
    return (
      this.config.SERVER_API +
      'customers/search?searchCriteria[currentPage]=' +
      page
    );
  }
  singleCustomer(page) {
    return this.config.SERVER_API + 'customers/' + page;
  }
  customerShippingAddress(id) {
    return this.config.SERVER_API + 'customers/' + id + '/shippingAddress';
  }
  getCustomerOrders(email) {
    return (
      this.config.SERVER_API +
      `orders?searchCriteria[filterGroups][0][filters][0][field]=customer_email&searchCriteria[filterGroups][0][filters][0][value]=${email}&searchCriteria[filterGroups][0][filters][0][conditionType]=e‌​q`
      // `orders?searchCriteria[currentPage]=1`
    );
  }

  getSingleOrder(id) {
    this.config.SERVER_API + `orders/${id}`;
  }
}
