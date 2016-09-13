/*
	Program to show the usage of the math functions
 */

#include <stdio.h>
#include <math.h>

int main() {
	int an_int = 5,
		another_int = 9;

	double a_double = 5;
	double PI = 3.14159;

	printf("abs(%d) = %d \n", an_int, abs(an_int));
	printf("abs(-55) = %d \n", abs(-55));
	printf("abs(%d) = %d \n", -an_int, abs(-an_int));
	printf("fabs(%f) = %f \n", a_double, fabs(a_double));
	printf("sqrt(%d) = %f \n", another_int, sqrt(another_int));
	printf("sin(PI) = %f \n", sin(PI));
	printf("2*sin(PI/2)*cos(PI/2) = %f \n", 2*sin(PI/2)*cos(PI/2));
	return 0;
}