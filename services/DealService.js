const fetchDeals = async () => {
    try {
      const response = await fetch('https://dotcomdumb.hopto.org/deals');
      const data = await response.json();
      return data.map(deal => ({
        id: deal.id,
        storeId: deal.store_id,
        title: deal.title,
        description: deal.description,
        price: deal.price,
        originalPrice: deal.original_price,
        expirationDate: new Date(deal.expiration_date),
        occupancy: null // This will be updated by subscribeToStoreOccupancy
      }));
    } catch (error) {
      console.error('Error fetching deals:', error);
      return [];
    }
  };
  