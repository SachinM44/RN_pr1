import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPlans, addUserSubscription } from '../apiService'; 
const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await getPlans();
        setPlans(plansData);
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSelectPlan = async (index) => {
    setSelectedPlan(index);
    const selectedPlanData = plans[index];
    try {
      await addUserSubscription({ planId: selectedPlanData.plan_id });
      alert('Subscription added successfully!');
    } catch (error) {
      console.error('Error adding subscription:', error);
      alert('Failed to add subscription.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderPlan = (plan, index) => {
    const isSelected = selectedPlan === index;
    return (
      <View key={index} style={[styles.planCard, isSelected && { borderColor: plan.color, borderWidth: 2 }]}>
        <View style={[styles.planHeader, { backgroundColor: plan.color }]}>
          <Text style={styles.planName}>{plan.name}</Text>
          <Text style={styles.planPrice}>{plan.price}<Text style={styles.perMonth}>/month</Text></Text>
        </View>
        <View style={styles.planFeatures}>
          {plan.description.split(',').map((feature, featureIndex) => (
            <View key={featureIndex} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={24} color={plan.color} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.selectButton, { backgroundColor: plan.color }]}
          onPress={() => handleSelectPlan(index)}
        >
          <Text style={styles.selectButtonText}>
            {isSelected ? 'Selected' : 'Select Plan'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Choose Your Subscription Plan</Text>
      {plans.map(renderPlan)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planHeader: {
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  planName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  planPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  perMonth: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  planFeatures: {
    padding: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  selectButton: {
    padding: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  selectButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default SubscriptionPlans;
