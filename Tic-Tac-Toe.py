import tkinter as tk
# click a button to place a mark
def click(p, i, j):
	# check if player can place a mark
	if btn_click[i][j]["text"] != " ":
		return
	# player's turn
	global cur_player
	if cur_player == True and p == "O":
		return
	if cur_player == False and p == "X":
		return	
	# place a mark, change player
	btn_click[i][j]["text"] = p
	cur_player = not cur_player
	# check win status
	if win_check(p) == "X":
		win_status["text"] = "P1 win!"
	elif win_check(p) == "O":
		win_status["text"] = "P2 win!"
	elif win_check(p) == "Tie!":
		win_status["text"] = "Tie!"
# clean the playboard
def restart(event):
	win_status["text"] = "game on"
	for i in range(3):
		for j in range(3):
			btn_click[i][j]["text"] = " "
# check if there are three same marks adjacent to each other
def win_check(p):
	if btn_click[1][1]["text"] == p:
		if btn_click[0][1]["text"] == btn_click[2][1]["text"] == p:
			return p
		elif btn_click[0][0]["text"] == btn_click[2][2]["text"] == p:
			return p
		elif btn_click[0][2]["text"] == btn_click[2][0]["text"] == p:
			return p
		elif btn_click[1][0]["text"] == btn_click[1][2]["text"] == p:
			return p
		
	else:
		if btn_click[0][0]["text"] == btn_click[0][1]["text"] == btn_click[0][2]["text"] == p:
			return p
		elif btn_click[0][0]["text"] == btn_click[1][0]["text"] == btn_click[2][0]["text"] == p:
			return p
		elif btn_click[0][2]["text"] == btn_click[1][2]["text"] == btn_click[2][2]["text"] == p:
			return p
		elif btn_click[2][0]["text"] == btn_click[2][1]["text"] == btn_click[2][2]["text"] == p:
			return p
	# check Tie
	for i in range(3):
		for j in range(3):
			if btn_click[i][j]["text"] == " ":
				return ""
	return "Tie!"


window = tk.Tk()

# a frame where plyer can see the win status and the clear playboard button
frame0 = tk.Frame(master=window, width=24, height=2, bg="white")
frame0.grid(row=3, column=1, padx=5, pady=5)
# bind clear playboard button with the clearboard funtion
clear = tk.Button(master=frame0, text="clear the board", width=12, height=2, fg="black")
clear.grid(row=3, column=1, sticky="nsew")
clear.bind("<Button-1>", restart)
# win status showboard
win_status =  tk.Label(master=frame0, text="game on", width=12, height=2, fg="black")
win_status.grid(row=3, column=2, padx=5, pady=5)
# create the playboard
btn_click = [[], [], []]

cur_player = True

for i in range(3):
	window.columnconfigure(i, weight=1, minsize=50)
	window.rowconfigure(i, weight=1, minsize=50)

	for j in range(3):
		frame = tk.Frame(
        	master=window,
        	relief=tk.RAISED,
        	borderwidth=1
        )
		frame.grid(row=i, column=j, padx=5, pady=5)
		# P1 uses left click to place "X" / P2 uses right click to place right click is "O"
		btn_click[i].append(tk.Button(master=frame, text=" ", width=12, height=8))
		btn_click[i][j].bind("<Button-1>", lambda event, p="X", i=i, j=j: click(p,i,j))
		btn_click[i][j].bind("<Button-3>", lambda event, p="O", i=i, j=j: click(p,i,j))
		btn_click[i][j].grid(row=i, column=j, sticky="nsew")

window.mainloop()

