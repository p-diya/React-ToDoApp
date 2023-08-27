import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Keyboard,
	ScrollView,
} from "react-native";
import Task from "./components/Task";

export default function App() {
	const [task, setTask] = useState();
	const [taskItems, setTaskItems] = useState([]);

	const handleAddTask = () => {
		Keyboard.dismiss();
		setTaskItems([...taskItems, task]);
		setTask(null);
	};

	const completeTask = (index) => {
		let itemsCopy = [...taskItems];
		itemsCopy.splice(index, 1);
		setTaskItems(itemsCopy);
	};

	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
				}}
				keyboardShouldPersistTaps="handled"
			>
				{/* Today's Tasks */}
				<View style={styles.tasksWrapper}>
					<Text style={styles.sectionTitle}>Today's Tasks</Text>
					<View style={styles.items}>
						{taskItems.map((item, index) => {
							return (
								<TouchableOpacity
									key={index}
									onPress={() => completeTask(index)}
								>
									<Task text={item} />
								</TouchableOpacity>
							);
						})}
					</View>
				</View>
			</ScrollView>

			{/* Write a task */}
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.writeTaskWrapper}
			>
				<TextInput
					style={styles.input}
					placeholder={"Write a task"}
					value={task}
					onChangeText={(text) => setTask(text)}
				/>
				<TouchableOpacity onPress={() => handleAddTask()}>
					<View style={styles.addWrapper}>
						<Text style={styles.addText}>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EDF3FC",
		paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
	},
	tasksWrapper: {
		paddingTop: 80,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#030812",
	},
	items: {
		marginTop: 30,
	},
	writeTaskWrapper: {
		position: "absolute",
		bottom: 60,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: "#FFF",
		borderRadius: 60,
		borderColor: "#B9D0F3",
		borderWidth: 1,
		width: 250,
	},
	addWrapper: {
		width: 60,
		height: 60,
		backgroundColor: "#FFF",
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "#B9D0F3",
		borderWidth: 1,
	},
	addText: {},
});
