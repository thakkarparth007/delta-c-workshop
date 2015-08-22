/*
	Name: p6.conditionals.c
	Description: Input
 */
#include <stdio.h>

int main() {
	float area;

	float height;
	float width;

	printf("Enter the height and the width of the shape: ");
	scanf("%f %f", &height, &width);

	printf("Enter 1 to compute the area of a rectangle\n");
	printf("Enter 2 to compute the area of a triangle\n");
	scanf("%d", &type);

	if(type == 1) {
		printf("Area of the rectangle is %f\n", width * height);
	}
	else if(type == 2) {
		printf("Area of the rectangle is %f\n", width * height / 2);
	}
	else {
		printf("Error: Bad input.\n");
	}

	return 0;
}